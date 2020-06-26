import styled from 'styled-components';

export const CustomTagWrapper = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    .icon {
      vertical-align: -0.15em;
      overflow: hidden;
    }
    .topBar{
       background-color: #ffda44;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
      .topBar-title{
        width: 100%;
        .icon{
          width: 26px;
          height: 26px;
          fill: black;
        }
        display: flex;
        font-size: 20px;
        padding:15px ;
        justify-content: space-between;
      }
      .categoryBar{
        width: 70%;
        margin-bottom: 10px;
      }
    }
    .tags-stage{
      flex-grow: 1;
      overflow: auto;
      ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
   }
      .showTags button::after{
         content: '';
         background-color: #fff;
         display: block;
         margin: 0 auto;
         height: 2px;
         width: 14px;
         border:1px solid #fff;  
            
      }
      .showTags,.unshowTags{
        li{
          box-shadow: 0 -1px 2px -1.5px rgba(0,0,0,0.5);
          padding: 6px 0;
          display: flex;
          align-items: center;
          button{
            margin:0 8px;
            background-color: red;
            outline: none;
            border:none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          >div{
            display: flex;
            align-items: center;
            font-size: 14px;
          }
          .iconWrapper{
              margin: 0 8px;
              background-color: #d5d5d5;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
             .icon{
                width: 18px;
                height: 18px;
                fill: #333;
             }
          }
          &:first-child{
            box-shadow: none;
          }
        }
      }
      .unshowTags{
        > div{
          margin: 10px 0 0 6px;
          font-size: 14px;
          color: #666;
        }
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          > .icon{
            width: 16px;
            height: 16px;
            fill: #fff;  
          }
          background-color: green !important;
        }
      }
    }
    .addTagsButton{
      >button{
        width: 100%;
        background-color: #fff;
        border: none;
        border-top:1px solid rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding:15px 0;
        outline: none;
        .icon{
          width: 17px;
          height: 17px;
          fill: #4f4e4e;
        }
      }
    }
`;

