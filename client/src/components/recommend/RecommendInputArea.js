import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import RecommendContext from './RecommendContext';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { Search, ArrowClockwise } from 'react-bootstrap-icons';
import RecommendDisplay1 from './RecommendDisplay1';
import RecommendDisplay2 from './RecommendDisplay2';
import RecommendDisplay3 from './RecommendDisplay3';
import RecommendDisplay4 from './RecommendDisplay4';
import RecommendDisplay5 from './RecommendDisplay5';
import Loading from './Loading';

const category = {
  교육: 'Education',
  교통: 'Transportation',
  복지: 'Welfare',
  안전: 'Safety',
  인구: 'Population',
  편의: 'Convenience',
  환경: 'Environment'
};

function RecommendInputArea() {
  const {
    firstOpen,
    secondOpen,
    thirdOpen,
    fourthOpen,
    fifthOpen,
    isLoading,
    contractType
  } = useContext(RecommendContext);

  // function inputValidation() {
  //   if (!firstCategory || !secondCategory || !thirdCategory || !contractType) {
  //     alert('선택하지 않은 값이 있습니다.');
  //     return false;
  //   }

  //   if (contractType === 'jeonse' && minDeposit >= maxDeposit) {
  //     alert('예산 범위를 다시 확인해주세요.');
  //     return false;
  //   }

  //   if (
  //     contractType === 'month' &&
  //     (minDeposit >= maxDeposit || minRent >= maxRent)
  //   ) {
  //     alert('예산 범위를 다시 확인해주세요.');
  //     return false;
  //   }
  // }

  return (
    <DisplayContainer>
      {firstOpen && <RecommendDisplay1 />}
      {!firstOpen && secondOpen && <RecommendDisplay2 />}
      {!secondOpen && thirdOpen && <RecommendDisplay3 />}
      {!thirdOpen && fourthOpen && <RecommendDisplay4 />}
      {!fourthOpen && fifthOpen && <RecommendDisplay5 />}
      {contractType === 'jeonse' && !fourthOpen && isLoading && <Loading />}
      {contractType === 'month' && !fifthOpen && isLoading && <Loading />}
    </DisplayContainer>
  );
}

const DisplayContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 100px;
`;
export default RecommendInputArea;

/*
 return (
    <StyledLayout>
      <StyledInputArea>
        <div>
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
              onChange={(e) => {
                setFirstCategory(e.target.value);
              }}
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
              onChange={(e) => {
                setSecondCategory(e.target.value);
              }}
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
              onChange={(e) => {
                setThirdCategory(e.target.value);
              }}
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
          <Button
            variant='primary'
            title='찾기'
            // onClick={(e) => {
            //   if (inputValidation()) getRecommendData(e);
            // }}
            onClick={getRecommendData}
          >
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
      </StyledInputArea>
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  display: flex;
  margin-top: 20px;
`;
const StyledInputArea = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

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

*/
