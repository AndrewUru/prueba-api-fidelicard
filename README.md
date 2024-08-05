# Fidelicard Integration

Este proyecto permite integrar la creación de un nuevo partner utilizando Stripe y ActivePieces. La integración incluye la creación de un cliente en Stripe y la utilización de los datos obtenidos para registrar un partner en ActivePieces.

## Requisitos

- Node.js v14 o superior
- NPM (Node Package Manager)
- Una cuenta de Stripe
- Una cuenta de ActivePieces

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tuusuario/fidelicard-integration.git
    cd fidelicard-integration
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las claves de Stripe y ActivePieces en el archivo `config.js`:

    ```javascript
    module.exports = {
      stripeSecretKey: 'YOUR_STRIPE_SECRET_KEY', // Reemplaza con tu clave secreta de Stripe
      activePiecesApiUrl: 'https://api.activepieces.com/v1', // URL de la API de ActivePieces
      activePiecesApiToken: 'YOUR_ACTIVE_PIECES_API_TOKEN' // Token de autenticación de ActivePieces
    };
    ```

## Uso

Para crear un nuevo partner utilizando Stripe y ActivePieces, ejecuta el siguiente comando:

```bash
node createPartnerWithStripe.js
