/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    GLConstants = require('./GLConstants'),
    stamp = require('./../utils/stamp');
/**
 * prefix of Cache
 */
const prefixProgram = 'PROGRAM',
    prefixUniform = 'UNIFOMR';
/**
 * @class
 */
class GLProgram extends Dispose {
    /**
     * 
     * @param {GLContext} glContext 
     */
    constructor(glContext) {
        /**
         * 
         */
        super(prefixProgram);
        /**
         * 索引glContext对象
         */
        this._glContext = glContext;
        /**
         * 映射attribute 和返回值
         */
        this._attributeCache = {};
        /**
         * 映射uniforms
         */
        this._uniformCache = {};
        /**
         * @type {GLShader}
         */
        this._vs = null;
        /**
         * @type {GLShader}
         */
        this._fs = null;
    }
    /**
     * @returns {Number}
     */
    get attachNum() {
        let num = 0;
        if (this._vs)
            num++;
        if (this._fs)
            num++;
        return num;
    }
    /**
     * @returns {Array}
     */
    get uniforms() {
        return this._uniforms;
    }
    /**
     * @returns {Array}
     */
    get attributes() {
        return this._attributes;
    }
    /**
     * attach shader
     * @param {GLShader} shader 
     */
    attachShader(shader) {
        if (shader.type === GLConstants.FRAGMENT_SHADER)
            this._fs = shader;
        else if (shader.type === GLConstants.VERTEX_SHADER)
            this._vs = shader;
    }
    /**
     * initial shader and analysis uniform/attribute
     */
    link() {
        //complier vShader and fShader
        const gl = this._glContext._gl,
            vs = this._vs,
            fs = this._fs;
        //vshader
        const vShader = gl.createShader(vs.type);
        gl.shaderSource(vShader, vs.source);
        gl.compileShader(vShader);
        //fshader
        const fShader = gl.createShader(fs.type);
        gl.shaderSource(fShader, fs.source);
        gl.compileShader(fShader);
        //program
        const program = gl.createProgram();
        gl.attachShader(program,vShader);
        gl.attachShader(program,fShader);
        gl.linkProgram(program);
        //store uniforms and attributes
        this._attributes = [];
        this._uniforms = [];
        //map attribute locations
        const numAttribs = gl.getProgramParameter(program, GLConstants.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttribs; ++i) {
            const info = gl.getActiveAttrib(program, i);
            this._attributes.push({
                name:info.name,
                type:info.type,
                size:info.size
            });
        }
        const numUnifroms = gl.getProgramParameter(program, GLConstants.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUnifroms; ++i) {
            const info = gl.getActiveUniform(program, i);
            this._uniforms.push({
                name:info.name,
                type:info.type,
                size:info.size
            });
        }
        //distory shader and program
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        gl.deleteProgram(program);
        //reverse value and key
        this._updateKeyValue();
    }
    /**
     * 
     */
    _updateKeyValue() {
        const uniforms = this._uniforms,
            attributes = this._attributes,
            uniformCache = this._uniformCache,
            attributeCache = this._attributeCache;
        //attribute location index
        let index = 0;
        //unifrom map
        uniforms.forEach(uniform => {
            const uniformLocation = { glProgram: this };
            stamp(uniformLocation, prefixUniform);
            uniformCache[uniform.name] = uniformLocation;
        });
        //attribute map
        attributes.forEach(attribute => {
            attributeCache[attribute.name] = index++;
        });
    }
    /**
     * no longer need to replace,return location directly
     * @param {GLenum} pname 
     */
    getAttribLocation(pname) {
        return this._attributeCache[pname];
    }
    /**
     * @param {DOMString} pname 
     */
    getUnifromLocation(pname) {
        const uniformLocation = { glProgram: this };
        stamp(uniformLocation, prefixUniform);
        this._uniformCache[pname] = this._uniformCache[pname] || uniformLocation;
        return this._uniformCache[pname];
    }
}

module.exports = GLProgram;