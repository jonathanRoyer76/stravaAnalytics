import { UtilsMethods } from './utils'

describe('getTokenExpirationTime', ()=>{
    it('devrait retourner null', ()=>{
        let value = UtilsMethods.getTokenExpirationTime(-1);
        expect(value).toBeNull();
    })

    it('devrait retourner une date', ()=>{
        let value = UtilsMethods.getTokenExpirationTime(123456789);
        expect(value).toBeGreaterThan(0);
    })
})

describe('isAccessTokenExpired', ()=>{
    it('devrait renvoyer null', ()=>{
        let value = UtilsMethods.isAccessTokenExpired(-1);
        expect(value).toBeNull(); 
    })

    it('devrait renvoyer true', ()=>{
        let value = UtilsMethods.isAccessTokenExpired(0);
        expect(value).toBeTruthy();
    })
})