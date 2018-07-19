/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/**
 * Context that is used during request handling.
 *
 * @type {module.RequestContext}
 */
module.exports = class RequestContext {
  constructor(req, cfg) {
    const { url } = req;
    this._cfg = cfg;
    this._url = url;
    this._path = url || '/';
    this._selector = '';
    this._extension = '';

    let relPath = this._path;
    const lastSlash = relPath.lastIndexOf('/');
    const lastDot = relPath.lastIndexOf('.');
    if (lastDot > lastSlash) {
      relPath = relPath.substring(0, lastDot);
      const queryParamIndex = this._path.lastIndexOf('?');
      this._extension = this._path.substring(
        lastDot + 1,
        (queryParamIndex !== -1 ? queryParamIndex : this._path.length),
      );
      // check for selector
      const selDot = relPath.lastIndexOf('.');
      if (selDot > lastSlash) {
        this._selector = relPath.substring(selDot + 1);
        relPath = relPath.substring(0, selDot);
      }
    } else if (lastSlash === relPath.length - 1) {
      relPath += 'index';
    }
    this._resourcePath = relPath;
  }

  get url() {
    return this._url;
  }

  // eslint-disable-next-line class-methods-use-this
  get valid() {
    return true;
  }

  get path() {
    return this._path;
  }

  get config() {
    return this._cfg;
  }

  get resourcePath() {
    return this._resourcePath;
  }

  get extension() {
    return this._extension;
  }

  get selector() {
    return this._selector;
  }
};