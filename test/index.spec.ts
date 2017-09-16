import equal from '@async-generators/equal';
import mapMany from '../src';
import { expect } from 'chai';

describe("@async-generator/filter", () => {
  it("should throw error if source is not iterable", async () => {
    let error: Error;
    try {
      for await (const _ of mapMany(<any>{}, x => [x]));
    } catch (err) {
      error = err.message;
    }
    expect(error).to.be.eq("source parameter is not iterable");
  })

  it("should pass item index (sequence order) of value to predicate", async () => {
    let source = async function* () {
      yield "a"; yield "b"; yield "c"; yield "d";
    }
    let index = 0;
    let expected = [0, 1, 2, 3];
    let result = [];

    for await (const _ of mapMany(source(), (x, i) => { result.push(i); return [true] }));

    expect(expected).to.be.eql(result);
  })

  it("should yield all items of sync-iterator from selector(item)", async () => {
    let source = async function* () {
      yield 1; yield 3;
    }

    let expected = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }

    expect(await
      equal(
        expected(),
        mapMany(source(), (x) => [x, x + 1]
        ))).to.be.true
  });

  it("should yield all items of async-iterator from selector(item)", async () => {
    let source = async function* () {
      yield 1; yield 3;
    }

    let expected = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }

    let selector = async function* (item: number) {
      yield item; yield item + 1;
    }

    expect(await
      equal(
        expected(),
        mapMany(source(), (x) => selector(x)
        ))).to.be.true
  });
})
