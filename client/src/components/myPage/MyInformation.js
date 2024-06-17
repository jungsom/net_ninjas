import styled from 'styled-components';
import { PencilSquare } from 'react-bootstrap-icons';


function MyInformation(){

    return(
    <InformationLayout>
        <div className='thumbnail'>
            <img className='thumbnailImage' src={`img/defaultUser.jpg`}/>
        </div>

        <div className='profile'>
            <div className='info'>
                <div className='nameArea'>홍길동</div>
                <div>gildong@naver.com</div>
            </div>
            <div className='edit'>
                <div onClick={()=> window.location.href = '/EditMyInformation'}><PencilSquare/> 내 정보 수정</div>
            </div>
        </div>
    </InformationLayout>
    );
}

const InformationLayout = styled.div`
    display: flex;
    //background-color:red;
    .profile{
        display: flex;
         display: grid;
        place-content: end;

        .info, .edit{
            width: 100%;
            height: 100px;
        }

        .info{
            display: grid;
            place-content: end; 
        }

        .edit{
            position: relative;
            font-size:.8em;
            color:gray;

            div{
                position: absolute;
                left: 0;
                bottom: 0;
            }

            div:hover{
            cursor: pointer;
            }    
        }
    }

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
    }



    .nameArea{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        font-size: 1.5em;
        display: inline;
    }


`;


export default MyInformation;
