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



const ZERO = '0'.charCodeAt(0);
const NINE = '9'.charCodeAt(0);
const A = 'a'.charCodeAt(0);

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

    index(i: number, value: number): void {
        switch (i) {
            case 0: {
                this.x = value;
                break;
            }
            case 1: {
                this.y = value;
                break;
            }
            case 2: {
                this.z = value;
                break;
            }
        }
    }

    private static hexCode(char: number) {
        if (char >= ZERO && char <= NINE) {
            return (char - ZERO) & 0xff;
        }

        return (10 + char - A) & 0xff;
    }

    static fromHex(hex: string): Vec3 {
        hex = hex.toLowerCase();
        if (hex[0] === '#') {
            hex = hex.substring(1);
        }

        const out = new Vec3(0, 0, 0);

        if (hex.length !== 3 && hex.length !== 6) {
            return out;
        }

        for (let i = 0; i < 3; i++) {
            if (hex.length === 3) {
                const char = this.hexCode(hex.charCodeAt(i));
                out.index(i, (char << 4) | char);
                continue;
            }


            const index = i * 2;
            const upper = this.hexCode(hex.charCodeAt(index));
            const lower = this.hexCode(hex.charCodeAt(index + 1));
            out.index(i, (upper << 4) | lower);
        }

        return out;
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
