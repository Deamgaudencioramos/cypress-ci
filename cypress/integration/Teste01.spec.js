
describe('teste01', () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    it('Preencher campos', () => {
    const fristname = "deam";
    const lastname ="gaudencio";
    cy.get('#first-name').type(fristname);
    cy.get('#last-name').type(lastname);
    cy.get('#email').type("deamgaudencio1@gmail.com")
    cy.get('#requests').type("carnivoro");
    cy.get('#signature').type(`${fristname} ${lastname}`);
    });
   it('interagir com campo do tipo select', () => {
    cy.get('#ticket-quantity').select("3");
   });
    
   it('Selcionando Radio button', () => {
    cy.get('#vip').check();
   });

   it('Selecionando checkbox', () => {
    cy.get('#social-media').check();
   });

   it('Marcando um box e desmarcando o box', () => {
    cy.get('#friend').check();
    cy.get('#publication').check();
    cy.get('#friend').uncheck();
   });

   it('Verificar se tem o titulo "TICKETBOX"', () => {
    cy.get('header h1').should("contain","TICKETBOX");
       
   });
   
   it('Alerta de email invalido', () => {
       cy.get("#email")
       .as("email")
       .type("teste-deam.com.br");
       cy.get("#email.invalid").should("exist");

       cy.get("@email")
       .clear()
       .type("teste-deam@gmail.com");
       cy.get("#email.invalid").should("not.exist");
    });
    
    it('Preencher os campos e resetar', () => {
        const fristname = "deam";
        const lastname ="gaudencio";
        const fullname = `${fristname} ${lastname}`;
        cy.get('#first-name').type(fristname);
        cy.get('#last-name').type(lastname);
        cy.get('#email').type("deamgaudencio1@gmail.com");
        cy.get('#ticket-quantity').select("2");
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get('#requests').type("IPA Beer");
        
        cy.get(".agreement p").should(
            "contain", 
            `I, ${fullname}, wish to buy 2 VIP tickets.`
        );
        
        cy.get("#agree").click();
        cy.get("#signature").type(fullname);

        cy.get("button[type='submit']")
        .as("submitbutton")
        .should("not.be.disabled");

        cy.get("button[type='reset']").click();
        cy.get("@submitbutton").should("be.disabled");
    });

    it('Preencher os campos obrigatorios', () => {
        const custumer = {
            fristname: "joao",
            lastname: "silva",
            email: "joaosilvar@example.com"
        }
        cy.camposObrigatorios(custumer);
        
        cy.get("button[type='submit']")
        .as("submitbutton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();
        cy.get("@submitbutton").should("be.disabled");
    });





});
