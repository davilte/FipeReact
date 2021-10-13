import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, Text, Modal, ActivityIndicator } from 'react-native';
import { Item, Container, Label, Header, Title, BackButton, BackButtonText, Option, Type, Value, CloseModal } from './styles';
// import Header from '../../components/Header';

function Fipe() {

    const [list, setList] = useState([]);
    const [stage, setStage] = useState(1);
    const [brand, setBrand] = useState(brand);
    const [model, setModel] = useState(model);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [car, setCar] = useState("");

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
        setLoading(true)
        fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            setList(res)
            setStage(1);
            setLoading(false);
        })
    }

    const selectBrand = (codigo) => {
        setLoading(true)
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            setList(res.modelos);
            setStage(2);
            setBrand(codigo);
            setLoading(false);
        })
    }

    const selectYear = (codigo2) => {
        setLoading(true)
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${codigo2}/anos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log('selectYear', res);
            setList(res);
            setStage(3);
            setModel(codigo2);
            setLoading(false);
        })
    }

    const getPrice = (codigo3) => {
        setLoading(true)
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${codigo3}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            console.log(res.Marca);
            setCar(res)
            setModalVisible(true);
            setLoading(false);
        })
    }

    return (
        <Container>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
            <Container>
                <Option>
                    <Type>Marca:</Type>
                    <Value>{car.Marca}</Value>
                </Option>
                <Option>
                    <Type>Modelo:</Type>
                    <Value>{car.Modelo}</Value>
                </Option>
                <Option>
                    <Type>Ano:</Type>
                    <Value>{car.AnoModelo}</Value>
                </Option>
                <Option>
                    <Type>Código fipe:</Type>
                    <Value>{car.CodigoFipe}</Value>
                </Option>
                <Option>
                    <Type>Combustível:</Type>
                    <Value>{car.Combustivel}</Value>
                </Option>
                <Option>
                    <Type>Mês de referência:</Type>
                    <Value>{car.MesReferencia}</Value>
                </Option>
                <Option>
                    <Type>Sigla do combustível:</Type>
                    <Value>{car.SiglaCombustivel}</Value>
                </Option>
                <Option>
                    <Type>Tipo de veículo:</Type>
                    <Value>{car.TipoVeiculo}</Value>
                </Option>
                <Option>
                    <Type>Valor:</Type>
                    <Value>{car.Valor}</Value>
                </Option>
                <CloseModal onPress={() => setModalVisible(false)}><Text style={{color:'white'}}>Voltar</Text></CloseModal>
            </Container>
            </Modal>
            <Header>
                {stage != 1 &&
                    <Pressable onPress={back}>
                        <BackButton onPress={back}><BackButtonText>&lt;</BackButtonText></BackButton>
                    </Pressable>
                }
                <Title>Consulta FIPE</Title>
            </Header>
            {loading &&
            <ActivityIndicator size="large" color="grey" animating={loading} />
            }
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