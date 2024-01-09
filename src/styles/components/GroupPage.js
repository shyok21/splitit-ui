import { Constant } from "../../utils/constant";
import styled from "styled-components";

export const HomepageBody = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: ${Constant.defaultBackgroundColor};
    color: ${Constant.defaultTextColor};
    display: flex;
    flex-direction: column;
`

export const appBarStyle = {
    width: '100%',
    height: '70px',
    backgroundColor: Constant.darkBackgroundColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}

export const HomepageHeading3 = styled.h3`
    width: 80vw;
`

export const groupStyle = {
    width: '45vw',
    margin: '2%',
    height: '60vw',
    background: Constant.lightBackgroundColor,
    border: `solid ${Constant.lightBackgroundColor} 1px`,
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"center",
    alignItems: 'center',
    color: Constant.defaultTextColor,
    textDecoration: 'none'
}

export const groupPageStyle = {
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '5%'
}