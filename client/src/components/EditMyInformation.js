import styled from 'styled-components';
import { ChevronRight, CameraFill } from 'react-bootstrap-icons';

function EditMyInformation() {
  const infos = ['닉네임', '이메일', '비밀번호 변경'];

  function getInfoValue(type)
  {
    switch(type){
      case '닉네임':
        return '홍길동';
      case '이메일':
        return 'gildong@naver.com';  
      default:
        return '';
    }
  }

  function generateItems () {
    const items = [];
    for (let i = 0; i < infos.length; i++) {
        items.push(
          <div>
            <div className='information-item' onClick={()=> console.log(infos[i])}>
              <div className='info-key'>{infos[i]}</div>
              <div className='info-value'>{getInfoValue(infos[i])} <ChevronRight/></div>
            </div>
            {i == infos.length - 1? '' : <hr/>}
            
          </div>

        );
    }
    return items;
};

  return (
    <StyledCenterLayout>
      <StyledContent>
        <h2>내 정보 수정</h2>
        <div className='thumbnail'>
            <img className='thumbnailImage' src={`img/defaultUser.jpg`}/>
            <div className='edit-thumb'><CameraFill/></div>
        </div>

        <div className='informations'>
          {generateItems()}
        </div>

      <div className='bottom-menu'>로그아웃 | 회원탈퇴</div>
        

      </StyledContent>
    </StyledCenterLayout>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  h2 {
    margin-top: 30px;
    text-align: center;
  }

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
 

  .thumbnail{
      position: relative;
      max-width:200px;
      max-height:200px;
      margin:20px;
      border-radius: 50%;
      color: white;

      .thumbnailImage{
        width: 100%;
        height: 100%;
        object-fit: cover; 
        border-radius: 50%;
      }

      .edit-thumb{
        text-align:center;
        position:absolute;
        width:50px;
        height:50px;
        font-size:1.5em;
        border-radius: 50%;
        background-color:#BDBDBD;
        right:0;
        bottom:0;
        border:3px solid white;
      }
  }
      
  .informations{
    width: 150%;
    border: 1px solid #ccc;
    border-radius: 10px; 
    padding: 20px; 


    .information-item{
      width:100%;
      display: flex;
      justify-content: space-between;

      .info-key{
        font-weight: bold;
        font-size: 1.1em;
      }

      .info-value{
        font-align:right;
        color:gray;
      }
    }

    .information-item:hover{
      cursor:pointer;
    }
  }

  .bottom-menu{
    color:gray;
    margin-top:50px;
  }
`;

export default EditMyInformation;
