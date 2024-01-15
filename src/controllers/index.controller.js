import {pool} from '../db.js'

export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "HELL YEAH!!!" AS result')
    res.json(result[0]) 
}