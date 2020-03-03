export interface IGetNumericKey<T> {
  (instance: T): number
}
export class OrderedList<T> {
  constructor (public fetcher: IGetNumericKey<T>, public readonly highToLow: boolean = false) {
  }
  private elements: T[] = []

  private binarySearch (key: number): number {
    const arr = this.elements
    const fetcher = this.fetcher
    let m: number = 0
    let n: number = arr.length - 1
    while (m <= n) {
      const k: number = (n + m) >> 1
      let cmp: number = key - (fetcher(arr[k]))
      if (this.highToLow) cmp *= -1
      if (cmp > 0) {
        m = k + 1
      } else if (cmp < 0) {
        n = k - 1
      } else {
        return k
      }
    }
    return -m - 1
  }

  public top (): T {
    return this.elements.length > 0 ? this.elements[0] : null
  }

  public bottom (): T {
    return this.peek()
  }

  public get (i: number): T {
    const elements = this.elements
    return elements[i]
  }

  public count (): number {
    return this.elements.length
  }

  public peek (): T {
    const elements = this.elements
    return elements.length > 0 ? elements[elements.length - 1] : null
  }

  public exists (elem: T): boolean {
    const where = this.binarySearch(this.fetcher(elem))
    return where >= 0
  }

  public find (key: number): T {
    const where = this.binarySearch(key)
    return where >= 0 ? this.elements[where] : null
  }

  public add (elem: T): number {
    const where = this.binarySearch(this.fetcher(elem))
    if (where < 0) {
      const arr = this.elements
      arr.splice(-where - 1, 0, elem)
    }
    return where
  }

  public remove (elem: T): boolean {
    const where = this.binarySearch(this.fetcher(elem))
    if (where >= 0) {
      const arr = this.elements
      arr.splice(-where - 1, 1)
    }
    return where >= 0
  }
}
