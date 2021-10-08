import React, { useState, useEffect } from 'react';
import { Item, Container, Label } from './styles'

let cars = [
    'ka',
    'onix',
    'corola'
]

function Fipe() {

    const [list, setList] = useState(list)

    useEffect(() => {
        console.log('ola')
        getBrands();
    }, []);

    const getBrands = () => {
        fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }).then((response) => response.json()).then((res) => {
            console.log(res);
            setList(res)
        })
    }

    return (
        <Container>
            {list.map((l, index) => ( 
                <Item key={l.codigo}>
                    <Label>{l.nome}</Label>
                </Item>
            ))}
        </Container>
    )
}

export default Fipe;