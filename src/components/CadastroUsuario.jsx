// use api request
import React from "react";
import { useState, useEffect } from "react";

import { useApiRequest } from "../hooks/useApiRequest";

const CadastroUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  const url = "http://localhost:3000/usuarios";

  const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function obterDados() {
//       const res = await useApiRequest();
//       const dados = await res.json;
//       setUsuarios(usuarios);
//     }
//     obterDados();
//   }, []);

  // 4 - custom Hook

  const { data: items, httpConfig, loading, error } = useApiRequest(url);

  //  2º adicionando usuarios

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (usuarios) => {
    setSelectedItem(usuarios);
    setNome(usuarios.nome);
    setEmail(usuarios.email);
    setSenha(usuarios.senha);
    setId(usuarios.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    // Identificar qual botão foi clicado
    const clickedButton = e.nativeEvent.submitter;
    const buttonName = clickedButton.nome;

    console.log(buttonName);

    if (buttonName === "incluir") {
      const usuarios = {
        nome: nome,
        email: email,
        senha: senha,
      };
      httpConfig(usuarios, "POST");
    } 
    
    else if (buttonName === "alterar") {
      const usuarios = {
        id: id,
        nome: nome,
        email: email,
        senha: senha,
      };
      httpConfig(usuarios, "PUT");
    }
    // quando clicado irá deletar todos os dados escolhidos, como por exemplo o id, nome, email e senha
    else if (buttonName === "excluir") {
      const usuarios = {
        id: id,
        nome: nome,
        email: email,
        senha: senha,
      };
      console.log("excluir");
      httpConfig(usuarios, "DELETE");
    }
    setNome("");
    setEmail("");
    setId("");
  };

  return (
    <div className="container">
      <h1 className="text-center">Lista de Usuários 2 </h1>
      <div className="filter-usuarios mb-3">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ height: "200px", overflowY: "auto" }}>
        <table className="table table-hover responsive">
          <thead style={{ position: "sticky", top: 0, background: "white" }}>
            <tr>
              <th>Nome</th>
              <th>E-Mail</th>
              <th>Senha</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items
                .filter((usuarios) =>
                  usuarios.nome.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((usuarios) => (
                  <tr
                    className={selectedItem === usuarios ? "table-active" : ""}
                    key={usuarios.id}
                    onClick={() => handleItemClick(usuarios)}
                  >
                    <td>{usuarios.nome}</td>
                    <td>{usuarios.email}</td>
                    <td>{usuarios.senha}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div>
        {loading && <p>Carregando dados ... </p>}
        {error && <p>{error}</p>}
      </div>
      {/* 2º adicionando usuário */}
      <div className="add-products mt-3">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group mb-3">
            <label htmlFor="id" className="form-label">
              Id :
            </label>
            <input
              className="form-control"
              type="text"
              disabled
              value={id}
              nome="id"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="nome" className="form-label">
              Nome :{" "}
            </label>
            <input
              className="form-control"
              type="text"
              value={nome}
              nome="nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              E-Mail :{" "}
            </label>
            <input
              className="form-control"
              type="email"
              step="0.01"
              value={email}
              nome="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="senha" className="form-label">
              Senha :{" "}
            </label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              value={senha}
              nome="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {/* Botões CRUD */}
          {/* Tratando DuploClique  */}
          <div className="d-flex justify-content-between">
            {!loading && (
              <button type="submit" className="btn btn-primary " nome="incluir">
                Incluir
              </button>
            )}
            {!loading && (
              <button type="submit" className="btn btn-primary " nome="alterar">
                Alterar
              </button>
            )}
            {!loading && (
              <button type="submit" className="btn btn-primary" nome="excluir">
                Excluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
