import {
  concat,
  filter,
  first,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  take,
  takeUntil
} from 'rxjs';

export class State<T> {
  private _isInitialized: boolean;
  private currentState: T | undefined;

  data$ = new Subject<T>();
  buffer$ = new ReplaySubject<T>(1);
  buffObs = new ReplaySubject<ReplaySubject<T>>(1);
  bs = this.data$.subscribe(this.buffer$); // Buffer subscribes to data
  repeater$ = concat(
    this.buffObs.pipe(
      takeUntil(this.data$),
      switchMap((e) => e)
    ),
    this.data$
  );

  constructor() {
    this._isInitialized = false;
    this.buffObs.next(this.buffer$);
    this.currentState = undefined;
  }

  set(state: Observable<T>) {
    this._isInitialized = true;
    state.pipe(take(1)).subscribe((x) => {
      this.currentState = x;
      this.data$.next(x);
    });
  }

  get(): Observable<T> {
    return this.repeater$.pipe(filter((val) => this._isInitialized));
  }

  getValue(): T | undefined {
    return this.currentState;
  }

  reset() {
    this._isInitialized = false;
    this.bs.unsubscribe();
    this.buffer$.complete();

    this.buffer$ = new ReplaySubject(1);
    this.bs = this.data$.subscribe(this.buffer$);
    this.buffObs.next(this.buffer$);
  }

  override(state: Observable<T>) {
    this.reset();
    this.set(state);
  }

  isInitialized() {
    return this._isInitialized;
  }

  /**
   * Gets with reset condition
   * @param reset set true to reset state
   * @param state new api state
   * @returns state
   */
  getWithResetCondition(reset: boolean, state: Observable<T>): Observable<T> {
    if (reset || !this.isInitialized()) {
      this.reset();
      this.set(state);
      return this.get();
    }
    return this.get();
  }
}

export class MapState<K, T> {
  private mapState: Map<K, State<T>>;

  constructor() {
    this.mapState = new Map<K, State<T>>();
  }

  set(key: K, state: Observable<T>) {
    const s = this.mapState.get(key);
    if (s) {
      s.set(state);
    } else {
      this.mapState.set(key, new State<T>());
      this.mapState.get(key)?.set(state);
    }
  }

  get(key: K): Observable<T> | undefined {
    const s = this.mapState.get(key);
    if (s) {
      return s.get();
    }
    return undefined;
  }

  getCurrent(key: K): T | undefined {
    const s = this.mapState.get(key);
    if (s) {
      return s.getValue();
    }
    return undefined;
  }

  reset(key?: K) {
    if (key) {
      const s = this.mapState.get(key);
      if (s) {
        return s.reset();
      }
    } else {
      Array.from(this.mapState.values()).map((state) => state.reset());
    }
  }

  override(key: K, state: Observable<T>) {
    this.reset(key);
    this.set(key, state);
  }

  isInitialed(key: K): boolean {
    const s = this.mapState.get(key);
    if (s) {
      return s.isInitialized();
    }
    return false;
  }

  /**
   * Gets with reset condition
   * @param reset set true to reset state
   * @param state new api state
   * @returns state
   */
  getWithResetCondition(reset: boolean, key: K, state: Observable<T>): Observable<T> {
    if (reset || !this.isInitialed(key)) {
      // not initial or not exist
      this.reset(key);
      this.set(key, state);
      return this.get(key) as Observable<T>;
    }
    return this.get(key) as Observable<T>;
  }
}
