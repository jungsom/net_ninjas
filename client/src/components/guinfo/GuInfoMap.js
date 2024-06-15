import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { feature } from 'topojson-client';
import seoul from '../../data/seoul.json';
import styled from 'styled-components';
import GuInfoDescription from './GuInfoDescription';

const initialWidth = 850; // 초기 너비
const initialHeight = 850; // 초기 높이

function GuInfoMap() {
  const [guName, setGuName] = useState('');
  const svgRef = useRef(null);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const featureData = feature(seoul, seoul.objects['seoul-topo']); // mapshaper에서 simplify한 파일을 가져와서 지리 정보를 표현하는데 씀

  const printD3 = () => {
    // 메르카토르 투영법 설정 (지구를 평먼으로 그릴 때 많이 쓰는 방법이라 함)
    const projection = d3.geoMercator().scale(1).translate([0, 0]);
    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(featureData);

    // svg 크기에 따른 지도의 크기와 위치값을 설정
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.9 / Math.max(dx / width, dy / height);
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    projection.scale(scale).translate(translate);

    // 클릭하면 지도를 삭제하고 변경할 크기로 다시 그려줘야 하기 때문에 기존의 지도를 삭제함
    d3.select(svgRef.current).selectAll('*').remove();

    // svg 다시 그려줌
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const mapLayer = svg.append('g');

    mapLayer
      .selectAll('path')
      .data(featureData.features)
      .enter()
      .append('path') // path element로 추가
      .attr('d', path)
      .style('fill', '#5b5ba0') // 배경 색상 설정
      .style('stroke', '#ffffff') // 경계선 설정
      .style('stroke-width', 0.2) // 경계선 굵기 설정
      .on('mouseover', function () {
        d3.select(this).style('fill', '#212168'); // 마우스를 올렸을 때 변할 색상 설정
      })
      .on('mouseout', function () {
        d3.select(this).style('fill', '#5b5ba0'); // 마우스를 땠을 때 다시 원래대로 돌아가게 설정
      })
      .on('click', function (event, d) {
        setGuName(d.properties.SIGUNGU_NM); // 마우스를 클릭하면 발생할 event 설정
        console.log(d.properties.SIGUNGU_NM);
        setWidth(500);
        setHeight(500);
      });

    mapLayer
      .selectAll('.gu-label')
      .data(featureData.features)
      .enter()
      .append('text') // text element로 추가
      .attr('class', 'gu-label') // 클래스 이름을 설정
      .attr('x', (d) => path.centroid(d)[0])
      .attr('y', (d) => path.centroid(d)[1])
      .attr('dx', '-0.9em') // x 좌표 위치 조정
      .attr('dy', '0.4em') // y 좌표 위치 조정
      .text((d) => d.properties.SIGUNGU_NM) // 표시할 라벨 텍스트 항목 설정
      .style('fill', '#ffffff') // 텍스트 색상 설정
      .style('font-size', '13px') // 텍스트 크기 설정
      .on('click', function (event, d) {
        setGuName(d.properties.SIGUNGU_NM); // 마우스를 클릭하면 발생할 event 설정
        console.log(d.properties.SIGUNGU_NM);
        setWidth(500);
        setHeight(500);
      });
  };

  // 페이지가 처음 랜더링될 때 그려주도록 설정
  useEffect(() => {
    printD3();
  }, [width, height]); // width와 height 상태가 변경될 때마다 printD3 함수를 호출하여 지도를 다시 그리도록 설정

  return (
    <>
      <StyledDiv>
        <StyledMap>
          <svg ref={svgRef}></svg>
        </StyledMap>
        {guName && <GuInfoDescription guName={guName} />}
      </StyledDiv>
      {!guName && (
        <StyledDiv>
          <h4>환영 문구</h4>
        </StyledDiv>
      )}
    </>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledMap = styled.div`
  user-select: none;
`;

export default GuInfoMap;
