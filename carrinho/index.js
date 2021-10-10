import {Container} from './styled'

import CarrinhoItem from './carrinhoItem'

import {Link} from "react-router-dom";

import {useEffect, useState} from "react"

import Cookie from 'js-cookie'




export default function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  
  useEffect(carregarCarrinho, []);
  function carregarCarrinho() {

    let carrinho = Cookie.get('carrinho');
    carrinho = carrinho !== undefined 
                  ? JSON.parse(carrinho) 
                  : [];
    setProdutos(carrinho);
  }
  

  function removerProduto(id) {

    let carrinho = produtos.filter(item => item.id !== id);
    

    Cookie.set('carrinho', JSON.stringify(carrinho));

  
    setProdutos([...carrinho]);
  }


  function alterarProduto(id, qtd) 
  {
  
     let produtoAlterado = produtos.filter(item => item.id === id)[0];
     produtoAlterado.qtd = qtd;
 
     Cookie.set('carrinho', JSON.stringify(produtos));
  }
  return (
    <Container>
      <h1> Carrinho </h1>

      <Link to="/"> Voltar </Link>

      <div className="itens">
        {produtos.map(item => 
            <CarrinhoItem key={item.id} 
                info={item} 
                onUpdate={alterarProduto} 
                onRemove={removerProduto} />
        )}
      </div>

    </Container>
  )


}