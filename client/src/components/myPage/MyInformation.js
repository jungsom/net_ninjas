import styled from 'styled-components';
import { EmojiSmile, PencilSquare, ChevronRight } from 'react-bootstrap-icons';


function MyInformation(){

    return(
    <InformationLayout>
       <Thumbnail>
       <PencilSquare className='pencil' />
       <StyledImage src={`img/defaultUser.jpg`}/>
       </Thumbnail>

    <div>
        <div className='leftArea'>
            <NameArea><div><div className='userName'>홍길동</div>님, 안녕하세요! </div></NameArea>
            <div>gildong@naver.com</div>
        </div>
    <div className='rightArea'>
    <ChevronRight/>
    </div>
    </div>
    </InformationLayout>
    );
}

const InformationLayout = styled.div`
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

const NameArea = styled.div`
    .userName{
        font-weight: bold;
        font-size: 1.5em;
        display: inline;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const Thumbnail = styled.div`
    position: relative;
    width:200px;
    height:200px;
    margin:20px;
    border-radius: 20px;
    color: white;


    .pencil {
        position: absolute; 
        top: 5px;
        right: 5px;
        font-size: 20px;
        mix-blend-mode: difference;
    }
`;

export default MyInformation;
