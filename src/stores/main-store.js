import { observable } from 'mobx'


class MainStore {

    @observable files = []

}

const mainStore = new MainStore()