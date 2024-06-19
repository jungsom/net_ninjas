import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from 'react-bootstrap/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function RecommendResult() {
  return (
    <>
      <Container maxWidth='xl'>
        <h4>ooo님에게 가장 적합한 동네는...</h4>
        <Stack gap={3}>
          <div>
            <h2>1순위 oo구 oo동</h2>
            <p>
              oo구 oo동은 oo 지표에서 1위, oo지표에서 2위, oo지표에서 3위를
              했어요.
            </p>
            <h4>교육</h4>
            <h4>교통</h4>
            <h4>복지</h4>
          </div>
          <div>
            <h2>2순위 oo구 oo동</h2>
            <p>
              oo구 oo동은 oo 지표에서 1위, oo지표에서 2위, oo지표에서 3위를
              했어요.
            </p>
            <h4>교육</h4>
            <h4>교통</h4>
            <h4>복지</h4>
          </div>
          <div>
            <h2>3순위 oo구 oo동</h2>
            <p>
              oo구 oo동은 oo 지표에서 1위, oo지표에서 2위, oo지표에서 3위를
              했어요.
            </p>
            <h4>교육</h4>
            <h4>교통</h4>
            <h4>복지</h4>
          </div>
        </Stack>
      </Container>
    </>
  );
}

// export default function RecommendResult() {
//     return(
//         <>
//         <p>ooo님에게 최적의 동네는...</p>
//         <p></p>
//         </>
//     )
// }
