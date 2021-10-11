import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { Item, Container, Label, Header, Title, BackButton, BackButtonText } from './styles';
// import Header from '../../components/Header';

function Fipe() {

    const [list, setList] = useState([]);
    const [stage, setStage] = useState(1);
    const [brand, setBrand] = useState(brand);
    const [model, setModel] = useState(model);

    useEffect(() => {
        console.log('ola')
        setStage(1)
        getBrands();
    }, []);

    const choose = (codigo) => {
        console.log('a');
        if (stage == 1) {
            console.log('select brand');
            selectBrand(codigo);
        } else if (stage == 2) {
            selectYear(codigo);
        } else if (stage == 3) {
            getPrice(codigo)
        }
    }

    const back = () => {
        if (stage == 2) {
            getBrands();
        } else if (stage == 3) {
            selectBrand(brand)
        }
    }

    const getBrands = () => {
        fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            setList(res)
            // setStage(1);
        })
    }

    const selectBrand = (codigo) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            setList(res.modelos);
            setStage(2);
            setBrand(codigo);
        })
    }

    const selectYear = (codigo2) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${codigo2}/anos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log('selectYear', res);
            setList(res);
            setStage(3);
            setModel(codigo2);
        })
    }

    const getPrice = (codigo3) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${codigo3}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
        })
    }

    return (
        <Container>
            {/* <Header></Header> */}
            <Header>
                <Pressable onPress={back}>
                    <BackButton onPress={back}><BackButtonText>&lt;</BackButtonText></BackButton>
                </Pressable>
                <Title>Consulta FIPE</Title>
            </Header>
            <ScrollView>
                {list.map((l, index) => (
                    <Pressable onPress={() => choose(l.codigo)} key={l.codigo}>
                        <Item>
                            <Label>{l.nome}</Label>
                        </Item>
                    </Pressable>
                ))}
            </ScrollView>
        </Container>
    )
}

export default Fipe;