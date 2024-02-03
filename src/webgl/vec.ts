export interface Vec {
    mul(n: number): void;
    add(n: number): void;
    clone(): Vec;
}



export class Vec2 implements Vec {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    mul(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    add(n: number): void {
        this.x += n;
        this.y += n;
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }
}



export class Vec3 implements Vec {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mul(n: number): void {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }

    add(n: number): void {
        this.x += n;
        this.y += n;
        this.z += n;
    }

    clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }
}



export class Vec4 implements Vec {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    mul(n: number): void {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        this.w *= n;
    }

    add(n: number): void {
        this.x += n;
        this.y += n;
        this.z += n;
        this.w += n;
    }

    clone(): Vec4 {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}
