import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProfilePage } from "./pages";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
