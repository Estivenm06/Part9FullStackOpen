const express = require('express')
const app = express()
app.use(express.json())

const PORT = 3001

app.use('/api/ping', (_req: any, res: any) => {
    console.log('pinned');
    res.send('Pong')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
})