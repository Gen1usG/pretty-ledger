import styled from 'styled-components';

export  const StatisticsWrapper = styled.div`
    header{
      background-color: #ffda44;
      font-family: 幼圆,serif;
      font-size: 20px;
      text-align: center;
      padding: 8px 0;
    }
    .month{
      height:38px;
    }
    .icon{
      width: 14px;
      height: 14px;
      vertical-align: -0.15em;
      fill: #000;
      overflow: hidden;
    }
    .wrapper{
      background-color: #ffda44;
      display: flex;
      .title{
        font-size: 14px;
        color:#a7a7a7;
        height: 22px;
        line-height: 22px;
      }
      .title,.month,.total{
         padding-left: 10px;
      }
      .timePicker{
        width: 25%;
        .month{
            display: flex;
            align-items: center;
            width: 100%;
            > .textWrapper{
              border-right:1px solid black;
              width: 100%;
              height:30px;
              display: flex;
              > div:nth-child(1){
                font-size: 20px;
                line-height: 30px;
              }
              > div:nth-child(2){
                font-size: 14px;
               line-height: 32px;
              }
            }
        }
      }
      .totalWrapper{
        width: 75%;
        display: flex;
        .income,.expenditure{
          width: 100%;
          .textWrapper{
            display: flex;
            height:38px;
            align-items: center;
          }
        }
      }
    }
`;

export const RecordsStage = styled.ul` 
  overflow: scroll;
  ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
   }
  .dateNtotal{
    border-bottom: 1px solid rgba(167,167,167,.1);
    .day-income,.day-expenditure,.day-date{
      font-size: 12px;
      color:#a7a7a7;
    }
    display: flex;
    justify-content: space-between;
    padding:8px;
    .day-total{
      display: flex;
      > div{
        margin:0 5px;
      }
    }
  }
  
  .record-list{
    >li a{
      display: flex;
      justify-content: space-between;
      align-items: center;  
      padding:10px;
    }
    .account{
      font-size: 14px;
    }
    .tagNameOrNote{
      display: flex;
      align-items: center;
      font-size: 14px;
      .beautyIcon{
        margin-right: 12px;
      }
    }   
  }
`;