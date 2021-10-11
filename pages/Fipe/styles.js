import styled from "styled-components/native";

export const Container = styled.View`
    overflow: scroll;
    height: 100%;
`

export const Header = styled.View`
    padding: 5px;
    width: 100%;
    height: 10%;
    border-bottom-color: lightgrey;
    border-bottom-width: 1px;
`

export const BackButton = styled.View`
    display: flex;
    height: 100%;
    justify-content: center;
    margin-top: 10px;
`

export const BackButtonText = styled.Text`
    font-size: 32px;
    margin-left: 8px;
`

export const Title = styled.Text`
    color: black;
    margin:  auto auto 3% auto;
    text-align: center;
`

export const Item = styled.View`
    border-bottom-color: lightgrey;
    border-bottom-width: 1px;
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 16px;
`
export const Label = styled.Text`
    color: black;
`