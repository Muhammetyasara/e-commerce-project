import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import ContactPage from "../pages/ContactPage";

export default function PageContent() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
    </main>
  );
}
