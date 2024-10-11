import { pixelblocks } from "../Pages/Pixelblocks";

export function checkDeviceType() {

    const isMobile = (window.innerWidth <= 600)
    pixelblocks.client.isMobile = isMobile;

    console.log(pixelblocks.client)

}