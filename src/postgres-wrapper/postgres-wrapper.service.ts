import {PGClient} from "../databaseSQL.connect";

export class DBSQLFactory{
    private static readonly models = {};

    static getModel(model) {
        if (!DBSQLFactory.models[model]) {
            DBSQLFactory.models[model] = new PostgresWrapper(model);
        }
        return DBSQLFactory.models[model];
    }
}
export class PostgresWrapper {
    constructor(private readonly model) {
    }
    async findAll(){
        const query = await PGClient.query(`SELECT * FROM "${this.model}";`)
        return query.rows
    }
    async findOneByID(id: string): Promise<any>{
        const query = await PGClient.query(`SELECT * FROM "${this.model}" WHERE id=${id};`)
        return query.rows
    }

    async insertOne(object){
        let resKeys = []
        let resValues = []
        for (const aElement of Object.keys(object)) {
            resKeys.push(aElement)
            resValues.push(`'${object[aElement]}'`)
        }
        return await PGClient.query(`INSERT INTO "${this.model}" (${resKeys.join()}) VALUES (${resValues.join()});`)
    }

    async updateOneById(id: number, update){
        let result = []
        for (const aElement of Object.keys(update)) {
            result.push(`${aElement} = ${update[aElement]}`)
        }
        return await PGClient.query(`UPDATE "${this.model}" SET ${result.join()} WHERE id = ${id};`)
    }

    async updateMany(filter, update){
        let resultFilter = []
        let resultUpdate = []
        for (const aElement of Object.keys(filter)) {
            resultFilter.push(`${aElement} = ${update[aElement]}`)
        }
        for (const aElement of Object.keys(update)) {
            resultUpdate.push(`${aElement} = ${update[aElement]}`)
        }
        return await PGClient.query(`UPDATE "${this.model}" SET ${resultUpdate.join()} WHERE ${resultFilter.join(' AND ')};`)
    }

    async deleteById(id){
        return await PGClient.query(`DELETE FROM "${this.model}" WHERE id = ${id}`)
    }

}
