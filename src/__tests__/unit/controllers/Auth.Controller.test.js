import { AuthController } from '../../../controllers/Auth.Controller';
import { describe, it, expect } from '@jest/globals';
import jest from 'jest'


jest.mock('../../../models/User')

describe('Auth Controller', () => {
  it('should be defined', () => {
    expect(AuthController).toBeDefined()
  })
})
