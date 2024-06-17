import styled from 'styled-components';


function MyPost(){

    const generateGridItems = () => {
        const items = [];
        for (let i = 0; i < 4; i++) {
            items.push(
                <div class="grid-item">
                <p>{i}. 제목</p>
                <img className='thumbnail' src="img/defaultUser.jpg"/>
                </div>
            );
        }
        return items;
    };

    return(
    <MyPostLayout>
    <div class="grid-container">
        {generateGridItems()}
    </div>
    </MyPostLayout>
    );
}

const MyPostLayout = styled.div`
    width:700px;
    height:700px;
    //background:red;

    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        padding: 10px;
        background-color: #FAFAFA;    
    }

    .grid-item {
    background-color: white;
        padding: 20px;
        text-align: center;
        border-radius: 10px;

        .thumbnail{
            height:80%;
            width:80%;
        }

        p{
            text-align: left;
            font-weight: bold;
        }
    }
`;

export default MyPost;
