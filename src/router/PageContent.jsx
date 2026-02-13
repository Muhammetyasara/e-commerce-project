import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

export default function PageContent() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </main>
  );
}