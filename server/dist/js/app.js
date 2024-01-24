"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5500;
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.join(__dirname, 'my-app')));
app.use("/api", routes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'my-app/public', 'index.html'));
});
const uri = "mongodb+srv://vbns:vb123@cluster0.ouzu0ay.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(uri).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB database: ', err);
});
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
