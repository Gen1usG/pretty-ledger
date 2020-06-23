import styled from 'styled-components';

const ChartsWrapper = styled.div`
    %iconComment{
      vertical-align: -0.15em;
      overflow: hidden;
   }
    
   .icon{
      width: 14px;
      height: 14px;
      vertical-align: 0;
      fill: #000;
      overflow: hidden;
   }
   .top-bar{
      background-color: #ffda44;
      display: flex;
      flex-direction: column;
      align-items: center;
      .category{
        padding:5px 0;
        font-size: 18px;
      }
      .categoryBar{
        width: 90%;
        margin:5px 0 10px 0;
      }
      .category-selector-wrapper{
        display: none;
        width: 100%;       
        height:100%;
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top:74px;
        z-index: 100;
        .category-selector{
          background-color: #fff;
          > li{
            .left-icon{
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              fill: #ffda44;
              margin:0 8px;
            }
            .right-icon{
              display: none;
              @extend %iconCommon;
              width: 20px;
              height: 20px;
              color: #334444;
              margin-right: 15px;
            }
            .show-right-icon{
              display: block;
            }
            display: flex;
            align-items: center;
            > div{
              flex-grow: 1;
              display: flex;
              justify-content: space-between;
              padding: 10px 0 ;
              border-bottom: 1px solid rgba(0,0,0,.2);
            }
          }
        }
      }
   }
   .charts-wrapper{
      border-bottom: 1px solid rgba(0,0,0,.2);
      #main-charts{
        margin:0;
        width: 100%;
        height:180px;
      }
      .charts-time{
        border-bottom:1px solid rgba(0,0,0,.2);
        padding:8px;
        > span{
        font-size: 14px;
        }
      }   
   }
   .rank{
      .rankCategory{
        padding:8px;
        > span {
          font-size: 14px;
        }
      }
      .rankList{
         overflow: auto;
        > li{
          margin:8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .beautyIcon{
            margin-right:8px;
          }
        }
        .rank-description-wrapper{
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          .rank-title{
            display: flex;
            justify-content: space-between;
             & span,& div{
              font-size: 16px;
              color: #334444;
            }
          }
         
        }
      }
   }
`;

export {ChartsWrapper}