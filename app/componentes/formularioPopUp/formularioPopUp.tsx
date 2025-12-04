"use client";
import { useState } from "react";
import './formularioPopUp.css'

const FormularioPopUp = () => {
    return (
        <div className="container-form">
            <form className="form-moradia">
                <div className="container-texto">
                    <h1>CADASTRAR MORADIA</h1>
                    <div className="container-label">
                        <label>NOME DA MORADIA</label>
                        <input></input>
                    </div>
                    <div className="container-label">
                        <label>ENDEREÇO</label>
                        <input></input>
                    </div>
                    <div className="container-label">
                        <label>CARACTERISTICAS</label>
                        <input></input>
                    </div>
                    <button>CADASTRAR</button>
                </div>
                
                <div className="container-mapa">

                </div>
            </form>
        </div>
    );
}

export default FormularioPopUp