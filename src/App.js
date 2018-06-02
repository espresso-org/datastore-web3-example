import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import { Datastore, providers } from 'datastore'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }

  }

  async componentWillMount() {

    try {
      const results = await getWeb3

      this.dataStore = new Datastore({
        storageProvider: new providers.storage.Ipfs(),
        encryptionProvider: new providers.encryption.Aes(),
        rpcProvider: new providers.rpc.Web3(results.web3)
      })

      const files = await this.dataStore.listFiles()
      this.setState({ files })

      window.dataStore = this.dataStore

    } catch (e) {
      console.log('Error ', e)
    }


  }

  uploadFiles = async () => {
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          var file = x.files[i]

          const result = await convertFileToArrayBuffer(file)

          console.log('file array buffer: ', result)
          //return this.ipfs.files.add(result)
          const fileId = await this.dataStore.addFile(result)
        
          console.log('fileId: ', fileId)
            

          txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
          }
        }
      }
    }
    else {
      if (x.value == "") {
        txt += "Select one or more files."
      } else {
        txt += "The files property is not supported by your browser!"
        txt += "<br>The path of the selected file: " + x.value // If the browser does not support the files property, it will return the path of the selected file instead. 
      }
    }
    document.getElementById("demo").innerHTML = txt
  }

  render() {
    return (
      <div className="App">
        <main className="container"> 

          <input type="file" id="myFile" multiple size="50" onChange={this.uploadFiles} />

          {this.state.files.map((file, i) =>
            <div key={i}>{i}: {file.fileSize.toString()}</div>
          )}
          <p id="demo"></p> 

        </main>
      </div>
    );
  }
}






function convertFileToArrayBuffer(file) {
  return new Promise((res, rej) => {

    let reader = new FileReader()

    reader.onload = function (e) {
      res(reader.result)
    }

    reader.readAsArrayBuffer(file)
  })
}


function downloadFile(file: ArrayBuffer, filename: string) {
  var blob = new Blob([file], { type: "application/pdf" })

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob)
    return
  }

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(blob)
  var link = document.createElement('a')
  link.href = data
  link.download = filename
  link.click()

  // For Firefox it is necessary to delay revoking the ObjectURL
  setTimeout(() => window.URL.revokeObjectURL(data), 100)

}


export default App
