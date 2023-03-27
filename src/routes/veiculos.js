import express from "express";
import sql from "mssql";
import { sqlConfig } from "../sql/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    try {
        sql.connect(sqlConfig)
            .then((pool) => {
                return pool.request().execute("SP_S_EST_VEICULO");
            })
            .then((dados) => {
                res.status(200).json(dados.recordset);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } catch (err) {
        console.error(`Erro de conexão: ${err.message}`);
    }
});

router.post("/", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { placa, nome, descricao, fabricacao, preco } = req.body;
            return pool
                .request()
                .input("placa", sql.Char(7), placa)
                .input("nome", sql.VarChar(50), nome)
                .input("descricao", sql.VarChar(200), descricao)
                .input("fabricacao", sql.Date, fabricacao)
                .input("placa", sql.Numeric, preco)
                .output("codigogerado", sql.Int)
                .execute("SP_I_EST_VEICULO");
        })
        .then((dados) => {
            res.status(200).json(dados.output);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

export default router;
