
class NftAddressNotFoundError extends Error {
    // Exception class, describing that the Customer's NFT Address does not exist, within the specific network 
    contructor() {
        this.message = "Failed to Find Your NFT Address within specified Network"
    }
}