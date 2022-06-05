import { Client } from '@elastic/elasticsearch'

class SearchClient {
    private connection
    constructor() {
        this.connection = new Client({
            node: process.env.ELASTICSEARCH_CONNECTION_STRING || 'http://localhost:9200'
        })
    }

    public getConnection(){
        return this.connection
    } 
}

export default new SearchClient()