import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Rola para o topo da página
  }, [pathname]);  // Executa sempre que a rota mudar

  return null;  // Não renderiza nada na tela
};

export default ScrollToTop;