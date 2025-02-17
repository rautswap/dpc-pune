import './App.css';
import Header from './Components/Header/Header';
import MainContent from './Components/MainContainer/MainContent';
import Footer from './Components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

export default App;
