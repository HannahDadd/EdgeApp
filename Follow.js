/**
 * This exposes the native Follow module as a JS module. This has a
 * function 'follow' which takes the following parameters:
 *
 * 1. ID of the item to follow
 * 
 * Will send token to website with ID to follow to receive notifications
 */
import {NativeModules} from 'react-native';
module.exports = NativeModules.Follow;