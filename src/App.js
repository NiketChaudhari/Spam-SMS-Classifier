import React, { useState } from 'react';
const axios = require('axios');


const App = () => {

  const [msgType, setMsgType] = useState("")
  const [inputMsg, setInputMsg] = useState("")
  const [msgColor, setMsgColor] = useState("")

  const [hoverColor, setHoverColor] = useState(true)
  



  const btn_clicked = () => {

    if(inputMsg === "") {
      setMsgType("Text should not be empty !")
      setMsgColor("Red")
    }
    else {
      const getData = async () => {
        const res = await axios.get(`https://spam-sms-classifier-ap.herokuapp.com/sms/${inputMsg}`);
        const { data } = await res;
        setMsgType(data)

        if (data === "Spam") {
          setMsgColor("Red")
        }
        else {
          setMsgColor("Green")
        }
      }

      getData()
    }
  }


  const inputMsgChanged = (e) => {
    setInputMsg(e.target.value)
    setMsgType("")

    console.log(e.target.value)


  }


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "95vh",
      padding: "20px",
      backgroundImage: "linear-gradient(to right, #EFB5C0 , #EAC4CC)"
    }}>

      <div style={{
        flex: 1,
        fontSize: 60,
        marginTop: "50px",
        textAlign: "center",
        color: "Green",
        fontWeight: "bold",
        fontFamily: "serif",
        textShadow: "2px 2px 5px white, 0 0 5px #0000FF"
      }}>
        Spam SMS Classifier
      </div>

      <textarea
        style={{
          flex: 5,
          border: "3px solid green",
          textAlign: "center",
          fontSize: 30,
          borderRadius: 20,
          color: "Green",
          WebkitTextFillColor: "Green",
          marginInline: "15%",
          wordWrap : "break-word",
          wordBreak : "break-all",
          overflow:"auto",
          whiteSpace:"pre-wrap",
          boxShadow: "0 5px #999"
        }}
        type="text"
        placeholder="Enter your text..."
        onChange={inputMsgChanged}
      />


      <button
        style={{
          flex: 1,
          margin: 20,
          marginInline: "30%",
          fontSize: 25,
          border: "3px solid green",
          borderRadius: "15px",
          cursor: "pointer",
          backgroundColor : (hoverColor ? "white":"lightgreen"),
          color: (hoverColor ? "Green":"blue"),
          fontWeight: "bold",
          fontFamily: "serif",
          boxShadow: "0 5px #999"
        }}
        onMouseOver={() => {setHoverColor(false)}}
        onMouseOut={() => {setHoverColor(true)}}

        onClick={btn_clicked}
      >
        Detect
      </button>

      <div
        style={{
          flex: 1,
          margin: 20,
          fontSize: 45,
          textAlign: "center",
          fontWeight : 'bold',
          color: (msgColor === "Red") ? 'Red' : "Green"
        }}
      >
        {msgType}
      </div>


      <div
        style={{ flex: 4 }}>
      </div>

    </div>
  );
}

export default App;
