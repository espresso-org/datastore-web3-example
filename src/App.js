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

  uploadFiles = async e => {
    const files = e.target.files

    for (let file of files) {
      const result = await convertFileToArrayBuffer(file)      
      await this.dataStore.addFile(result)        
    }  

  }

  render() {
    return (
      <div className="App">
        <main className="container"> 

          <input type="file" id="myFile" multiple size="50" onChange={this.uploadFiles} />

          {this.state.files.map((file, i) =>
            <div key={i}>{i}: {file.fileSize.toString()}</div>
          )}


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




export default App
