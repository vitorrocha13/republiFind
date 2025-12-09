"use client";
import { useState } from "react";
import styles from './formularioPopUp.module.css' // Importação alterada para Módulo CSS

const FormularioPopUp = () => {
    return (
        // className alterado para styles['container-form']
        <div className={styles['container-form']}> 
            {/* className alterado para styles['form-moradia'] */}
            <form className={styles['form-moradia']}> 
                {/* className alterado para styles['container-texto'] */}
                <div className={styles['container-texto']}>
                    <h1>CADASTRAR MORADIA</h1>
                    {/* className alterado para styles['container-label'] */}
                    <div className={styles['container-label']}>
                        <label>NOME DA MORADIA</label>
                        <input></input>
                    </div>
                    {/* className alterado para styles['container-label'] */}
                    <div className={styles['container-label']}>
                        <label>ENDEREÇO</label>
                        <input></input>
                    </div>
                    {/* className alterado para styles['container-label'] */}
                    <div className={styles['container-label']}>
                        <label>CARACTERISTICAS</label>
                        <input></input>
                    </div>
                    <button>CADASTRAR</button>
                </div>
                
                {/* className alterado para styles['container-mapa'] */}
                <div className={styles['container-mapa']}>

                </div>
            </form>
        </div>
    );
}

export default FormularioPopUp