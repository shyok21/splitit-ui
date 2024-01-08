import { Constant } from "../../utils/constant";
import styled from "styled-components";

const HomepageBody = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: ${Constant.defaultBackgroundColor};
    color: ${Constant.defaultTextColor};
    display: flex;
    flex-direction: column;
`

const appBarStyle = {
    width: '100%',
    height: '70px',
    backgroundColor: Constant.darkBackgroundColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}

const HomepageHeading3 = styled.h3`
    width: 80vw;
`



export {
    HomepageBody,
    HomepageHeading3,
    appBarStyle,
}