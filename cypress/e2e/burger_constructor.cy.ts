const testUrl = 'http://localhost:4000/';
const BASE_URL = 'https://norma.nomoreparties.space/api';

// const ingredientBunSelector = '[data-cy=bun-ingredients]'
// const ingredientMainSelector = '[data-cy=main-ingredients]'
// const ingredientSauceSelector = '[data-cy=sauce-ingredients]'
const inputEmal = 'input[name="email"]';
const inputPassword = 'input[name=password]';
const testUser = {
  email: 'sss@yandex.ru',
  password: '123qwe'
}

const modal = '[data-cy="modal"]';
const testCardSelector = '[class^="burger-ingredient_card"]';

const testConructorSelector = '[class^="burger-constructor_components"]';

const testButtonSelector = '[class^="button"]';


// https://norma.nomoreparties.space/api/auth/token
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFmZmMwMTE5ZDQ1MDAxYjUwN2EwZSIsImlhdCI6MTcyNzYyOTI2OSwiZXhwIjoxNzI3NjMwNDY5fQ.2TZL7BY5ZR-SU3FFn8--dyoYb5yuWeK6X6Jzj_cXpdE

// {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v4?s=UYH1oyU%2FGcTNOCuqunBwdbdXlD9ZnInLKXPxLY%2FQJeBGCZgoAvy9dpIXZVleUUNdUv5YyGvziOIIk%2FQdqnAGDShuxp4YqYo3p6Qbe8lBfnSLm66lhnYkDG%2BzAkrCq3K0%2FS4oRLx7gjzK7fcN"}],"group":"cf-nel","max_age":604800}

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  // cy.intercept('POST', `${BASE_URL}/auth/login`, {
  //   fixture: 'user.json'
  // });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'test_user.json'
  });
  // cy.intercept('POST', `${BASE_URL}/orders`, {
  //   fixture: 'orderResponse.json'
  // });
  cy.visit(testUrl);
  // cy.viewport(1440, 800);
  // cy.get('#modals').as('modal');
  
});

describe('template spec', () => {
  
  it('доступность сервиса по адрeсу localhost:4000', () => {
    cy.visit(testUrl);
    cy.contains('Соберите бургер')
  });

  it("загружаем массив ингредиентов", () => {
    cy.intercept("api/ingredients", {
      fixture: "ingredients.json",
    });
  });

  it('should show & hide ingredient popup', () => {
    cy.visit(testUrl);
    cy.contains('Соберите бургер')
    // // cy.get(testCardSelector).first().click();
    // // cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[href="/ingredients/643d69a5c3f7b9001cfa093c"]').click()
    cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c');
    cy.contains('h3','Детали ингредиента')
    cy.contains('h3','Краторная булка N-200i')
    // cy.get(modal).should('exist');
    // cy.get(modal).find('svg').first().click();
    // cy.get(modal).should('not.exist');
  });

  it('Проверка добавления ингредиентов в конструктор', () => {
    cy.visit(testUrl);
    cy.contains('Соберите бургер')
    cy.get('[href="/ingredients/643d69a5c3f7b9001cfa093c"]').parent('li').contains('Добавить').click();
    cy.contains('Краторная булка N-200i (верх)')
    cy.contains('Краторная булка N-200i (низ)')
    cy.get('[href="/ingredients/643d69a5c3f7b9001cfa093e"]').parent('li').contains('Добавить').click();

    cy.contains('Оформить заказ').should('be.enabled').click();
    cy.location('pathname').then(($pathname) => {
      if ($pathname == '/login') {
        cy.contains('Войти');
      } else {
        cy.get('[id ="modals"]').should('exist');
        cy.contains('Ваш заказ начали готовить');
      }
    })
      // cy.get('@mainIngredients').contains('Добавить').click()
    // cy.get(constructorElementTextSelector).contains('Биокотлета из марсианской Магнолии')
    // cy.get('@sauceIngredients').contains('Добавить').click()
    // cy.get(constructorElementTextSelector).contains('Соус Spicy-X')
  })

});

describe('auth user', () => {
  
  it('should authorization user', () => {
    cy.visit('http://localhost:4000/login')
    // cy.wait(1000);
    cy.contains('Личный кабинет').click();
    cy.contains('Вход');
    cy.get(inputEmal).click().type(testUser.email);
    // cy.get('input');
    cy.get(inputPassword).click().type(testUser.password);
    cy.contains('button', 'Войти').click();
    cy.location('pathname', { timeout: 1000 }).should('eq', '/profile');
  })
})
