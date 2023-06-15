import React, { useState } from "react";
import Header from "../../components/header/Header";
import Card from "./components/card/Card";
import { getRandomInt } from "../../lib/common";

import "./memoryCard.css";

const MemoryCard = () => {
    const [data, setData] = useState({
        gameStart: false
        , level: 1
        , numOfCard: 4
        , randomNum: []
        , clickedNum: []
        , score: 0
        , hist: 0
    });

    const shuffleNum = ((list = data.randomNum) => {
        let dump = [...list];
        let shuffle = [];
        for (let i = 0; i < data.numOfCard; i++) {
            shuffle.push(dump.splice(getRandomInt(dump.length), 1));
        }
        return shuffle;
    })();

    const getRandomNumList = (length) => {

        let tempList = [];
        for (let i = 0; i < length; i++) {
            tempList.push(getRandomInt(1000));
        }
        return tempList;
    }

    const startButtonHandler = (event) => {
        event.preventDefault();
        const tempList = getRandomNumList(data.numOfCard);
        setData({
            ...data
            , gameStart: true
            , randomNum: tempList
            , score: 0
        });
    }

    const callbackHandler = (value) => {
        if (data.clickedNum.includes(value)) {
            setData({
                ...data
                , gameStart: false
                , numOfCard: 4
                , clickedNum: []
                , level: 1
            })
        } else {
            if (data.clickedNum.length === data.randomNum.length - 1) {
                const tempList = getRandomNumList(data.numOfCard + 2);
                setData({
                    ...data
                    , level: ++data.level
                    , numOfCard: (data.numOfCard + 2)
                    , randomNum: tempList
                    , clickedNum: []
                    , score: ++data.score
                    , hist: data.hist > data.score ? data.hist : data.score
                })
            } else {
                setData({
                    ...data
                    , clickedNum: data.clickedNum.concat([value])
                    , score: ++data.score
                    , hist: data.hist > data.score ? data.hist : data.score
                });
            }
        }
    }

    if (!data.gameStart) {
        return (
            <div>
                <Header>
                    <div>THE MEMORY CARD GAME</div>
                </Header>
                <button onClick={startButtonHandler}>Start</button>
            </div>
        )
    } else {
        return (
            <>
                <Header key={data.score}>
                    <div>
                        Level: {data.level}, Score: {data.score}, Historic Best: {data.hist}
                    </div>
                </Header>
                <div id="card-container">
                    {shuffleNum.map(num => <Card key={num} value={num} callback={callbackHandler} />)}
                </div>
            </>
        )
    }

}

export default MemoryCard;