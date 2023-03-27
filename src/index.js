import express from "express";
import cors from "cors";
import rotasV from './routes/veiculos.js'
const app  = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/veiculos', rotasV);
app.use('/', express.static('public'));

//Rota Padrão
app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API Rodando',
        versao: '1.0.1'
    })
})

app.use((req, res) => {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})
