import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Proyecto Final",
            version: "1.0.0",
            description: "API de siste de facturación de productos",
            contact:{
                name: "Javier Herrera",
                email: "jherrera-2020459@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3005/salesManager/v1"
            }
        ]
    },
    apis:[
        "./src/Auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/buyCart/buyCart.routes.js",
        "./src/product/product.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}