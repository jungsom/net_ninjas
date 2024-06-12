import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';

function RecommendInputArea() {
  const {
    getRecommendData,
    firstCategory,
    setFirstCategory,
    secondCategory,
    setSecondCategory,
    thirdCategory,
    setThirdCategory,
    contractType,
    setContractType,
    minDeposit,
    setMinDeposit,
    maxDeposit,
    setMaxDeposit,
    minRent,
    setMinRent,
    maxRent,
    setMaxRent
  } = useContext(RecommendContext);

  const category = {
    교육: 'education',
    교통: 'transportation',
    복지: 'walfare',
    안전: 'safety',
    인구: 'population',
    편의: 'convenience',
    환경: 'Environment'
  };

  // 다른 순위에서 선택된 항목들은 선택 못하게 만드는 함수
  function createMenuItem(category, order) {
    const menuItemTag = [];
    const filter = [];
    order === 'first'
      ? filter.push(secondCategory, thirdCategory) // 매개변수가 "first"면 2순위, 3순위 값이 있는 항목은 제외하고 Menu를 생성
      : order === 'second'
      ? filter.push(firstCategory, thirdCategory)
      : filter.push(firstCategory, secondCategory);
    for (const key in category) {
      if (filter.includes(category[key])) continue; // filter 배열에 포함되면
      menuItemTag.push(
        <MenuItem key={category[key]} value={category[key]}>
          {key}
        </MenuItem>
      );
    }
    return menuItemTag;
  }

  return (
    <>
      <div>
        <h1>주거 추천 서비스</h1>
        <h4>1. 우선 순위 선택</h4>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id='first-select-label'>1순위</InputLabel>
          <Select
            labelId='first-select-label'
            id='first-simple-select'
            value={firstCategory}
            label='firstCategory'
            onChange={(e) => setFirstCategory(e.target.value)}
          >
            {createMenuItem(category, 'first')}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id='second-select-label'>2순위</InputLabel>
          <Select
            labelId='second-select-label'
            id='second-simple-select'
            value={secondCategory}
            label='secondCategory'
            onChange={(e) => setSecondCategory(e.target.value)}
          >
            {createMenuItem(category, 'second')}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id='third-select-label'>3순위</InputLabel>
          <Select
            labelId='third-select-label'
            id='third-simple-select'
            value={thirdCategory}
            label='thirdCategory'
            onChange={(e) => setThirdCategory(e.target.value)}
          >
            {createMenuItem(category, 'third')}
          </Select>
        </FormControl>
      </div>
      <div>
        <h4>2. 예산 종류 선택</h4>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id='contract-select-label'>전월세</InputLabel>
          <Select
            labelId='contract-select-label'
            id='contract-simple-select'
            value={contractType}
            label='contractType'
            onChange={(e) => setContractType(e.target.value)}
          >
            <MenuItem key={'jeonse'} value={'jeonse'}>
              전세
            </MenuItem>
            <MenuItem key={'month'} value={'month'}>
              월세
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <h4>3. 예산 범위 선택</h4>
      </div>
      <div>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '200px' }
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='minDeposit'
            type='Number'
            label='최소 보증금 (단위: 만원)'
            variant='outlined'
            value={minDeposit}
            onChange={(e) => setMinDeposit(e.target.value)}
          />
          ~
          <TextField
            id='maxDeposit'
            type='Number'
            label='최대 보증금 (단위: 만원)'
            variant='outlined'
            value={maxDeposit}
            onChange={(e) => setMaxDeposit(e.target.value)}
          />
        </Box>
      </div>
      {contractType === 'month' && (
        <div>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '200px' }
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='minRent'
              type='Number'
              label='최소 월세가 (단위: 만원)'
              variant='outlined'
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
            ~
            <TextField
              id='maxRent'
              type='Number'
              label='최대 월세가 (단위: 만원)'
              variant='outlined'
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
          </Box>
        </div>
      )}
      <StyledBtn>
        <Button variant='primary' title='찾기' onClick={getRecommendData}>
          찾기 <Search />
        </Button>
        <Button
          variant='primary'
          title='초기화'
          onClick={() => {
            setFirstCategory('');
            setSecondCategory('');
            setThirdCategory('');
            setMinDeposit(0);
            setMaxDeposit(0);
            setMinRent(0);
            setMaxRent(0);
          }}
        >
          초기화 <ArrowClockwise />
        </Button>
      </StyledBtn>
    </>
  );
}

const StyledBtn = styled.div`
  display: flex;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    svg {
      margin-left: 5px;
    }
  }

  button:nth-child(2) {
    margin-left: 3px;
  }
`;

export default RecommendInputArea;
